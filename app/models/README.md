# Models

In this directory will creating schemas using [mongoose](https://mongoosejs.com/docs/guide.html)

# example file userSchema.js

```
  import mongoose from 'mongoose';
  const { Schema } = mongoose;

  exports.userSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
  });
```