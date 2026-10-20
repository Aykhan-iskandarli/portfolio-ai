import {theme, ThemeConfig} from 'antd';
import colors from 'assets/styles/abstracts/color';
import fonts from 'assets/styles/abstracts/fonts';
import sizes from 'assets/styles/abstracts/sizes';

// Ant Design komponentləri CRT ekranının içində (tünd fon) işlədilir
export const themeConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: colors.primary,
        colorBgBase: colors.screenBg,
        colorBgContainer: colors.screenBg,
        colorBgElevated: colors.screenSurface,
        colorTextBase: colors.text,
        colorBorder: colors.screenBorder,
        colorError: colors.error,
        colorSuccess: colors.success,
        colorTextLightSolid: colors.onPrimary,
        fontFamily: fonts.font,
        fontSize: sizes.text,
        borderRadius: sizes.radiusSmall,
        controlHeightLG: sizes.touch + 4,
    },
    components: {
        Button: {
            primaryColor: colors.onPrimary,
            fontWeight: sizes.weight700,
        },
        Form: {
            labelColor: colors.text,
        },
    },
};
