export interface ISeo {
    titleKey: string;
    descriptionKey: string;
    path: string;
    image?: string;
    noIndex?: boolean;
    jsonLd?: Record<string, unknown>;
}
