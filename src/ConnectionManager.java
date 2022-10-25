Class ConnectionManager

import DB connection class (DriverManager.java) object

For Login:
public boolean loginCheck(username, password)
{
      statement = 'Select 1 from Users WHERE username = 'username' AND password = 'password';'
      result = DriverManager.call(statement);
      return result;
}

For Register:
public boolean registerUser(username, password, name, id_no <more fields to be added later according to form design>)
{
      statement = 'INSERT INTO Users VALUES('username','password','name','id_no');'
      result = DriverManager.call(statement);
      return result;
}
