# 1. What columns violate 1NF?
*food_code, food_description* contain few values;
*dinner_date* has different date-time format;
*member_id* is not unique, so we need to make a new primary key.

# 2. What entities do you recognize that could be extracted?
There are 4 entities: *member*, *dinner*, *venue*, *food*
Each entities has their own ID or code and could be in independent table.

# 3. Name all the tables and columns that would make a 3NF compliant solution.
Let's split data on 3 tables:
*members*  (member_id PK, member_name, member_address);
*dinners* (dinner_id PK, dinner_date); 
*venue* (venue_code PK, venue_description);
*food* (food_code PK, food_description);

to make relations between tables we could use these one:
*orders* (order_id PK, member_id, dinner_id);
*locations* (id PK, dinner_id, venue_code);
*goods* (id PK, dinner_id, food_code);
