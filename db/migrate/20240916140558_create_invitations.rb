class CreateInvitations < ActiveRecord::Migration[7.2]
  def change
    create_table :invitations do |t|
      t.string :email
      t.string :token

      t.timestamps
    end
  end
end
