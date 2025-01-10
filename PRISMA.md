The reason why I changed from sequelize to prisma is because it's easier to use and it's more modern.

Prisma is a modern database toolkit that makes it easy to interact with your database. It provides a powerful ORM (Object-Relational Mapping) layer that allows you to define your database schema in a declarative way, and then generate a client library that can be used to interact with the database.

Like literally, just look at this.

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

This is the schema for a user table. It's easy to understand and it's easy to use. All y'gotta do is define the schema and prisma will handle the rest. There is no need to create a migration files, like in sequelize. No need for a config file, no need for a database.js file, and your .env file is much cleaner too!

```env
DATABASE_URL="mysql://db_user:db_password@localhost:3306/app_name"
JWT_SECRET="your-super-secret-key"
```

This is literally it. You don't need to create a long ahh .env file with a bunch of dumb variables that might screw up your stuff in the future if you got it wrong once. Like I swear, most of my problems comes from the database.js bs.

No need for colorful, eye-catching, confusing ahh code. Just plain, simple, and easy to understand.

Like, compare this sequelize code to the prisma code.

```javascript
export default (sequelize) => {
  const Friends = sequelize.define('Friends', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    giftIdeas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reminderEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'birthday', 'passed'),
      defaultValue: 'upcoming'
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  Friends.associate = (models) => {
    Friends.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Friends.belongsTo(models.User, {
      foreignKey: 'friendId',
      as: 'friend'
    });
  };

  return Friends;
};
```

and this is the prisma code.

```prisma
model Friends {
  id              String   @id @default(uuid())
  userId          String
  friendId        String
  dateOfBirth     DateTime
  description     String?  @db.Text
  email           String?  @db.VarChar(255)
  giftIdeas       String?  @db.Text
  reminderEnabled Boolean  @default(true)
  status          Status   @default(upcoming)
  avatarUrl       String?  @db.VarChar(255)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user   User @relation("UserFriends", fields: [userId], references: [id])
  friend User @relation("FriendOf", fields: [friendId], references: [id])

  @@index([userId])
  @@index([friendId])
}

enum Status {
  upcoming
  birthday
  passed
}
```

Do you see the difference? Cause I sure do. Like, look at that! It's so much easier to understand and it's so much easier to use.
