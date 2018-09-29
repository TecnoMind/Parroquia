

export interface ICrud<T> {
    save(entity: T): Promise<void>;
    update(entity: T): void;
    deleteOne(entity: T): void;
}