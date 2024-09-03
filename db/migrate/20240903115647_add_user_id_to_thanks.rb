class AddUserIdToThanks < ActiveRecord::Migration[7.2]
  def change
    add_reference :thanks, :user, null: false, foreign_key: true
  end
end
