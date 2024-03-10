from flask import Flask, render_template, jsonify, request
import argparse
import psycopg2
import sys


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

@app.route('/search/<category>')
def search_category(category):
    return render_template('category_search_page.html', category=category)


# Define a route to handle the request for character information
@app.route('/fetch-category-element-names', methods=['POST'])
def fetch_category_element_names():
    try:
        request_data = request.get_json()
        category = request_data.get('fetch_from_category')

        print(category, file=sys.stdout)

        # Query the database for species information
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM %s", (category,))
        info = cursor.fetchall()
        cursor.close()
        conn.close()

        print(info, file=sys.stdout)

        if info:
            return jsonify(info)

        else:
            # Error if category not found
            return jsonify({'error': 'Category not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('host', help='the host server that this application runs on')
    parser.add_argument('port', help='the port that this application listens on')
    arguments = parser.parse_args()
    app.run(host=arguments.host, port=arguments.port, debug=True) 
