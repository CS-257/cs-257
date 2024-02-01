import psycopg2


# Connect to the database
def connect():
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        database="honga2",
        user="honga2",
        password="lion587smile")

    return conn


# Planet test queries
def query_planets():
    try:
        conn = connect()
        cur = conn.cursor()
    except:
        print("There was an issue connecting to the database")

    planet_queries = [
        # max population in US
        '''
        SELECT name
        FROM planets
        WHERE orbital_period > 0
        AND climate = 'temperate'
        AND population > 0;
        ''',
    ]

    if planet_queries is None:
        print("Something went wrong... Please verify that your query is valid.")
        exit()

    results = []
    for _ in planet_queries:
        cur.execute(_)
        rows = cur.fetchall()
        results.append(rows)

    for _ in results:
        print(_)

    conn.commit()
    return None


if __name__ == "__main__":
    query_planets()
