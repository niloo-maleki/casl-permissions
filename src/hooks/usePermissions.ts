import { useEffect, useState } from "react";
import { deepFreeze } from "@src/helper/helper";
import permissionsData from "@src/json/allResourceData.json";

export type PermissionsDataType = typeof permissionsData;

const OUTPUT_JSON_PATH = "src/json/allResourceData.json";

export const usePermissions = () => {
    const [Resources, setResources] = useState<Readonly<PermissionsDataType>>(deepFreeze(permissionsData));
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPermissionsData = async () => {

            if (process.env.NODE_ENV === "production") {
                setLoading(false);
                return;
            }


            try {
                const response = await fetch(`/${OUTPUT_JSON_PATH}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();
                setResources(deepFreeze(data));

            } catch (error) {
                console.error("❌ Error loading permissions data:", error);
                setError("Failed to load permissions data, using default.");
            } finally {
                setLoading(false);
            }
        };

        loadPermissionsData();
    }, []);


    return { Resources, error, loading };
};
