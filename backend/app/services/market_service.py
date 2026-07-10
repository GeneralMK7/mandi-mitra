import sqlite3

DB_PATH = "app/database/mandi_prices.db"

def get_market_data(state, district, crop):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM mandi_market_data
        WHERE state = ?
          AND district = ?
          AND commodity = ?
        ORDER BY arrival_date DESC
        LIMIT 1
    """, (state, district, crop))

    row = cursor.fetchone()

    conn.close()

    if row:
        return dict(row)

    return {"message": "No market data found"}