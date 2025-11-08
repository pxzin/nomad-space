import {
	defineConfig,
	presetUno,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: 'Inter',
				mono: 'Fira Code'
			}
		})
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup()
	],
	theme: {
		colors: {
			// Paleta espacial do GDD
			primary: {
				dark: '#1a1a2e',
				medium: '#16213e',
				light: '#0f3460'
			},
			secondary: {
				purple: '#533483',
				orange: '#f39c12',
				white: '#ecf0f1'
			},
			accent: {
				green: '#2ecc71',
				red: '#e74c3c'
			}
		}
	}
});
