import psycopg2

def fetch_species_data():
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            database="honga2",
            user="honga2",
            password="lion587smile"
        )
        cur = conn.cursor()
        cur.execute("SELECT * FROM species")
        species_data = cur.fetchall()  # Fetch all rows

        return species_data
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error fetching species data: {error}")
    finally:
        if conn is not None:
            cur.close()
            conn.close()

if __name__ == '__main__':
    species_data = fetch_species_data()
    if species_data:
        for species in species_data:
            print(species)  # Print fetched species data

