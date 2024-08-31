class CreateThanks < ActiveRecord::Migration[7.2]
  def change
    create_table :thanks do |t|
      t.string :category
      t.text :content
      t.date :date

      t.timestamps
    end
  end
end
