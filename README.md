# Employee Management App

**Backend** - a rest API built with express

**Frontend** - React with Typescript

**Database** - MongoDB

## Running instructions

### Backend

### Frontend

### Swagger Documentation

Auto-generated documentation can be accessed on http://localhost:3000/api-docs

## Data modeling

The application uses MongoDB with Mongoose as the Data Object Modeling (ODM) library, to manage 4 main entities:

- Employee
- Department
- Role
- Contract

Rather than embedding all the information into a single document, I've used references to connect these entities.

### MongoDB embedding vs references

- **Embedding** stores related information directly inside another document. This can be useful when the data is closely connected, is usually accessed together, and doesn't need to exist independently
- **References** store the ID of another document, creating relationships between separate collections. This is useful when records need to be reused, updated independently, or queried separately.

For this application, references made more sense to me, as

## Error handling

## Testing

## Next steps:
