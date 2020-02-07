## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :posts
- has_many :groups
- has_many  :users,  through:  :posts_tags

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
|chatname|text|null: false|
- has_many :posts
- has_many :posts_users
- has_many  :users,  through:  :posts_tags

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user