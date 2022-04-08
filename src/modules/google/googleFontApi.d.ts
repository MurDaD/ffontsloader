export declare class GoogleFontApi {
    private apiUrl_;
    private fonts_;
    private version_;
    /**
     * @param fonts
     * @param version
     */
    constructor(fonts: string[], version?: 1 | 2);
    /**
     * Builds font googleapis url from given fonts in constructor
     * @return string
     */
    buildUri(): string;
}
