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
def test_queries():
    try:
        conn = connect()
        cur = conn.cursor()
    except:
        print("There was an issue connecting to the database")

    tests = [
        # need to use regex to query columns with multiple values
        '''
        SELECT name
        FROM planets
        WHERE orbital_period > 0
        AND climate = 'temperate'
        AND terrain ~ '\mmountains\M'
        AND population > 0;
        ''',
        '''
        SELECT name
        FROM planets
        WHERE rotation_period = 24
        AND diameter > 12000
        AND gravity = '1 standard'
        AND surface_water = 0;
        ''',
        '''
        SELECT name
        FROM species
        WHERE designation = 'sentient'
        AND skin_color ~ '\mbrown\M'
        AND eye_color ~ '\myellow\M'
        AND language = 'Huttese';
        ''',
        # there's some weird stuff going on with column names here...
        '''
        SELECT name
        FROM species
        WHERE classification = 'reptile'
        AND height > 100
        AND har_color = 'NA'
        AND lifespan = 0
        AND homeworld = 'Trandosha';
        ''',
    ]

    if tests is None:
        print("Something went wrong... Please verify that your query is valid.")
        exit()

    results = []
    for _ in tests:
        cur.execute(_)
        rows = cur.fetchall()
        results.append(rows)

    for _ in results:
        print(_)

    conn.commit()
    return None


if __name__ == "__main__":
    test_queries()
