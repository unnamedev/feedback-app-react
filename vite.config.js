import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"
import {viteStaticCopy} from "vite-plugin-static-copy"

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    const processEnvValues = {
        "process.env": Object.entries(env).reduce(
            (prev, [key, val]) => {
                return {
                    ...prev,
                    [key]: val,
                }
            },
            {},
        )
    }

    return {
        plugins: [
            react(),
            // uncomment before deploy
            viteStaticCopy({
                targets: [
                    {
                        src: "./assets/images",
                        dest: "./assets"
                    },
                ]
            }),
        ],
        // ENV config
        define: processEnvValues,
    }
})



