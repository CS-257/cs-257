from flask import Flask, render_template, jsonify, request
import api
import argparse
import psycopg2


app = Flask(__name__, static_folder='static', template_folder='templates')


# Define a function to establish connection to PostgreSQL
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            dbname="honga2",
            user="honga2",
            password="lion587smile"
        )
        print("Database connection established successfully")
        return conn
    except Exception as e:
        print("Error connecting to database:", e)


@app.route('/')
def home():
    return render_template('home_page.html')


@app.route('/characters/')
def characters():
    return render_template('characters.html')


# Define a route to handle the request for character information
@app.route('/characters-info', methods=['POST'])
def characters_info():
    try:
        # Extract species name from request
        request_data = request.get_json()
        characters_name = request_data.get('characters')

        # Query the database for species information
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM characters WHERE name = %s", (characters_name,))
        characters_info = cursor.fetchone()
        cursor.close()
        conn.close()

        if characters_info:
            # If character information is found, return it as JSON
            return jsonify(characters_info)
        else:
            # If species not found, return appropriate response
            return jsonify({'error': 'Character not found'}), 404
    except Exception as e:
        # Handle any exceptions that occur during processing
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('host', help='the host server that this application runs on')
    parser.add_argument('port', help='the port that this application listens on')
    arguments = parser.parse_args()
    app.run(host=arguments.host, port=arguments.port, debug=True)  