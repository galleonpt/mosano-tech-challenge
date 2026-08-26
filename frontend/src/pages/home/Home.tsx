import dayjs from "dayjs";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BirthdayGreeting } from "../../components/birthdayGreeting";
import { Button } from "../../components/button";
import { DatePicker } from "../../components/datePicker";
import { Input } from "../../components/input";
import { Select } from "../../components/select";
import { Spinner } from "../../components/spinner";
import { VisitorsTable } from "../../components/VisitorsTable";
import { type Visitor } from "../../contexts/VisitorsContext";
import { useAuth } from "../../hooks/useAuth";
import { useCountries } from "../../hooks/useCountries";
import { useVisitors } from "../../hooks/useVisitors";
import styles from "./Home.module.css";

interface FormValues {
    name: string;
    surname: string;
    country_id: string;
    birthday: string;
}

export const Home: FC = () => {
    const { t } = useTranslation();
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

    const {
        register,
        handleSubmit: handleFormSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            surname: "",
            country_id: "",
            birthday: "",
        },
    });

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
            if (!selectedCountry) return;

            const newVisitor = {
                name: values.name,
                surname: values.surname,
                country: { name: selectedCountry.name },
                birthday: dayjs(values.birthday),
            };

            await addVisitor(newVisitor, values.country_id);
            await fetchVisitors();
            reset();
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (visitor: Visitor) => {
        setSelectedVisitor(visitor);
    };

    if (visitorsLoading || countriesLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.leftWrapper}>
                    <form
                        onSubmit={handleFormSubmit(handleSubmit)}
                        className={styles.form}
                    >
                        <Input
                            label={t("content.name")}
                            required
                            {...register("name", {
                                required: t("errors.name"),
                            })}
                            error={errors.name?.message}
                        />

                        <Input
                            label={t("content.surname")}
                            required
                            {...register("surname", {
                                required: t("errors.surname"),
                            })}
                            error={errors.surname?.message}
                        />

                        <Select
                            label={t("content.country")}
                            required
                            options={[
                                ...countries.map((country) => ({
                                    label: country.name,
                                    value: country._id,
                                })),
                            ]}
                            {...register("country_id", {
                                required: t("errors.country"),
                            })}
                            error={errors.country_id?.message}
                        />

                        <DatePicker
                            label={t("content.birthday")}
                            required
                            {...register("birthday", {
                                required: t("errors.birthday"),
                            })}
                            error={errors.birthday?.message}
                        />

                        <Button
                            type="submit"
                            label={t("actions.save")}
                            disabled={!isLoggedIn || loading}
                        />
                    </form>

                    <BirthdayGreeting visitor={selectedVisitor} />
                </div>
            </div>

            <div className={styles.column}>
                <VisitorsTable
                    visitors={visitors}
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};
