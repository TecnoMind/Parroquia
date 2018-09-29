interface SettingsDB {
    initialize(): void;
    read(): void;
    write(): void;
    getPaths(): void;
    fromJson(settings: object): void;

}