import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    message,
    Row,
    Select,
    Spin,
    Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState, type FC } from "react";
import { BirthdayGreeting } from "../components/BirthdayGreeting";
import { VisitorsTable } from "../components/VisitorsTable";
import { type Visitor } from "../contexts/VisitorsContext";
import { useAuth } from "../hooks/useAuth";
import { useCountries } from "../hooks/useCountries";
import { useVisitors } from "../hooks/useVisitors";

interface FormValues {
    name: string;
    surname: string;
    country_id: string;
    birthday: dayjs.Dayjs;
}

export const Home: FC = () => {
    const { isLoggedIn } = useAuth();
    const {
        visitors,
        loading: visitorsLoading,
        addVisitor,
        fetchVisitors,
        selectedVisitor,
        setSelectedVisitor,
    } = useVisitors();

    const {
        fetchCountries,
        countries,
        loading: countriesLoading,
    } = useCountries();

    const [form] = Form.useForm<FormValues>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCountries();
        fetchVisitors();
    }, []);

    const handleSubmit = async (values: FormValues) => {
        try {
            setLoading(true);
            const selectedCountry = countries.find(
                (c) => c._id === values.country_id,
            );
            if (!selectedCountry) throw new Error("Country not found");

            const newVisitor = {
                name: values.name,
                surname: values.surname,
                country: { name: selectedCountry.name },
                birthday: values.birthday,
            };

            await addVisitor(newVisitor, values.country_id);
            setSelectedVisitor(newVisitor as Visitor);
            form.resetFields();
        } catch (error) {
            message.error("Error adding visitor");
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (visitor: Visitor) => {
        setSelectedVisitor(visitor);
    };

    if (visitorsLoading || countriesLoading) {
        return <Spin />;
    }

    return (
        <Row gutter={[24, 24]} style={{ padding: "24px" }}>
            <Col xs={24} sm={24} md={12}>
                <Flex vertical gap="large">
                    <div>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your name",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="surname"
                                label="Surname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your surname",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="country_id"
                                label="Country"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a country",
                                    },
                                ]}
                            >
                                <Select
                                    options={countries.map((c) => ({
                                        label: c.name,
                                        value: c._id,
                                    }))}
                                    loading={countriesLoading}
                                />
                            </Form.Item>

                            <Form.Item
                                name="birthday"
                                label="Birthday"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select your birthday",
                                    },
                                ]}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{ width: "100%" }}
                                    disabledDate={(current) =>
                                        current > dayjs()
                                    }
                                />
                            </Form.Item>

                            <Tooltip
                                title={
                                    !isLoggedIn
                                        ? "You must login to add a new visitor"
                                        : undefined
                                }
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                    disabled={!isLoggedIn}
                                >
                                    Save
                                </Button>
                            </Tooltip>
                        </Form>
                    </div>

                    <BirthdayGreeting visitor={selectedVisitor} />
                </Flex>
            </Col>

            <Col xs={24} sm={24} md={12}>
                <h2 style={{ margin: "0 0 16px 0" }}>Visitors</h2>
                <VisitorsTable
                    visitors={visitors}
                    onRowClick={handleRowClick}
                />
            </Col>
        </Row>
    );
};
