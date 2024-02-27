from flask import Flask
from flask import render_template
import psycopg2

app = Flask(__name__)

#returns connection to database
def connect():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        database="honga2",
        user="bremerj",
        password="tree288cow")

def get_all_columns(db):
    conn = connect()
    cur = conn.cursor()

    sql = "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = %s;"
    cur.execute( sql, [db] )
    data = cur.fetchall();

    columns = []
    columnDataTypes = []

    for column in data:
        columns.append(str(column[0]))
        columnDataTypes.append(str(column[1]))

    return { 
        "columns" : columns,
        "columnDataTypes" : columnDataTypes
    }

@app.route('/filter/<category>')
def filters_test(category):
    allColumns = get_all_columns(category);
    data = {
        "criteriaOptions" : allColumns["columns"], 
        "criteriaOptions_dataTypes" : allColumns["columnDataTypes"]
    }

    return render_template("filters_test.html", data=data, category=category)

if __name__ == '__main__':
    my_port = 5122
    app.run(host='0.0.0.0', port = my_port) 
