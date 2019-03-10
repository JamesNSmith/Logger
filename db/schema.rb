# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190222235025) do

  create_table "aircrafts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "tail_number"
    t.string "name"
    t.string "actype"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "club_aircrafts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "club_id"
    t.bigint "aircraft_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aircraft_id"], name: "index_club_aircrafts_on_aircraft_id"
    t.index ["club_id"], name: "index_club_aircrafts_on_club_id"
  end

  create_table "club_memberships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "club_id"
    t.bigint "membership_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_club_memberships_on_club_id"
    t.index ["membership_id"], name: "index_club_memberships_on_membership_id"
  end

  create_table "club_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "membership_id"
    t.bigint "club_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_club_users_on_club_id"
    t.index ["membership_id"], name: "index_club_users_on_membership_id"
    t.index ["user_id"], name: "index_club_users_on_user_id"
  end

  create_table "clubs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "initials"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flights", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "club_id"
    t.string "takeoff_type"
    t.bigint "aircraft_id"
    t.bigint "club_user_p1_id"
    t.bigint "club_user_p2_id"
    t.date "launch_date"
    t.time "launch_time"
    t.time "land_time"
    t.integer "flight_time"
    t.decimal "launch_fee", precision: 6, scale: 2
    t.decimal "soaring_fee", precision: 6, scale: 2
    t.decimal "soaring_total", precision: 6, scale: 2
    t.decimal "total", precision: 6, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aircraft_id"], name: "index_flights_on_aircraft_id"
    t.index ["club_id"], name: "index_flights_on_club_id"
    t.index ["club_user_p1_id"], name: "index_flights_on_club_user_p1_id"
    t.index ["club_user_p2_id"], name: "index_flights_on_club_user_p2_id"
    t.index ["user_id"], name: "index_flights_on_user_id"
  end

  create_table "memberships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.boolean "mtype"
    t.decimal "launch_fee", precision: 6, scale: 2
    t.decimal "soaring_fee", precision: 6, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_aircrafts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "aircraft_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aircraft_id"], name: "index_user_aircrafts_on_aircraft_id"
    t.index ["user_id"], name: "index_user_aircrafts_on_user_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "u_id"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "utype"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
