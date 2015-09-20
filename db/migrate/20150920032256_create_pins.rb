class CreatePins < ActiveRecord::Migration
  def up
    create_table :pins do |t|
      t.string :title
      t.text :description
      t.float :latitude
      t.float :longitude
      t.integer :user_id

      t.timestamps null: false
    end
  end

  def down
    drop_table :pins
  end
end
