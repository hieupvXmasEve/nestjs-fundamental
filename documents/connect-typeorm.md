## Create an Entity

An Entity is a class that maps to a database table or to a collection when using MongoDB. In the context of NestJS, which often pairs with Object-Relational Mapping tools like TypeORM, an entity functions as the data model for the application, interfacing directly with the database schema. This exemplifies the software engineering principle of data source abstraction, allowing for easier swapping of databases or migration. As a best practice, encapsulating database interactions within repository classes streamlines code maintenance and enhances testability.

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("songs")
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("varchar", { array: true })
    artists: string[];

    @Column({ type: "date" })
    releasedDate: Date;

    @Column({ type: "time" })
    duration: Date;

    @Column({ type: "text" })
    lyrics: string;
}
```

### Explanation of Entity Class

- `@Entity('songs')` specifies that "songs" is the name of the database table.
- `@PrimaryGeneratedColumn()` is used to automatically increment the primary key. This can be specified here or within the database.
- `@Column()` defines a column, allowing specification of various data types, such as date, varchar, and time. This column definition offers precise mapping, crucial for efficient data querying and comprehensive schema definition.

### Example: `artists` Field

```typescript
@Column('varchar', { array: true })
artists: string[];
```

An array of artists is defined as a data structure to hold multiple artist entities. In a Postgres database, metadata is added to the `@Column` decorator in the NestJS application. As a best practice, strongly typing this array (for instance, as `string[]`) can improve code maintainability and reduce potential runtime errors. Additionally, leveraging Postgres’ native array data type within the `@Column` decorator optimizes array operations and queries.

### Example: `releasedDate` Field

```typescript
@Column({ type: 'date' })
releasedDate: Date;
```

The date type is specified for the release date, ensuring that no time-related properties are added to the `releasedDate` field. In NestJS, using class-validator’s `@IsDate()` decorator on the `releasedDate` property enforces type safety and validation, a best practice for robust, production-ready code.

### Example: `duration` Field

```typescript
@Column({ type: 'time' })
duration: Date;
```

Although `duration` is configured with the date type, it will only store time information as specified by setting the type to `time`. Explicitly naming the database column and its type with the `@Column` decorator reduces ambiguity and enhances code maintainability. Using type guards or DTOs (Data Transfer Objects) with class-validator ensures data adheres to the intended time format, enhancing data integrity.

### Example: `lyrics` Field

```typescript
@Column({ type: 'text' })
lyrics: string;
```

The `text` type in Postgres is ideal for long strings or text, whereas shorter text would use the `varchar` type.

## Update CreateSongDTO

```typescript
@IsString()
@IsOptional()
readonly lyrics: string;
```

A new field, `lyrics`, has been added to store the lyrics in the database. This field was not previously included in the `CreateSongDTO` file.

## Register the Entity in AppModule

To integrate the `Song` Entity with the application, include it in the `AppModule` by updating the TypeORM module. Specifically, add the `Song` Entity to the `entities` array within the `forRoot` method. NestJS allows seamless integration of entities through its modular structure. As a best practice, organizing entities in a dedicated configuration file can enhance modularity and ease of management.

```typescript
entities: [Song],
```