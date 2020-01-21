import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import desc
from sqlalchemy import asc

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/fedloan_db.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
allfedloan_data = Base.classes.all_fedloans
usfedloan_data = Base.classes.us_fedloans
schoolcount_data = Base.classes.annual_schoolct
annual_recipdisb_data = Base.classes.annual_recip_disb
usfedloan_schooltype_data = Base.classes.us_fedloans_schooltype

#################################################
# Set Up Homepage and Render Template
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("homepage.html")

#################################################
# Set Up About Me page and Render Template
#################################################

@app.route("/about")
def aboutme():
    """Return About Me page."""
    return render_template("about.html")

@app.route("/credits")
def credits():
    """Return Project Credits page."""
    return render_template("credits.html")

#################################################
# Flask route for all fed loan data
#################################################

@app.route("/fedloandata/all")
def allfedloandata(allfedloan_data = allfedloan_data):
    sel = [
        allfedloan_data.ope_id,
        allfedloan_data.school,
        allfedloan_data.school_name_org,
        allfedloan_data.ope_school_identifier,
        allfedloan_data.state,
        allfedloan_data.zip_code,
        allfedloan_data.school_type,
        allfedloan_data.year_begin,
        allfedloan_data.year_end,
        allfedloan_data.aid_year,
        allfedloan_data.dlsb_recip,
        allfedloan_data.sum_dlsb_disb,
        allfedloan_data.ugdlus_recip,
        allfedloan_data.sum_ugdlus_disb,
        allfedloan_data.grdlus_recip,
        allfedloan_data.sum_grdlus_disb,
        allfedloan_data.prplus_recip,
        allfedloan_data.sum_prplus_disb,
        allfedloan_data.grplus_recip,
        allfedloan_data.sum_grplus_disb,
        allfedloan_data.grdlsb_recip,
        allfedloan_data.sum_grdlsb_disb,
    ]

    results = db.session.query(*sel).all()

    allfedloandata = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "ugdlus_recip" : result[12],
            "sum_ugdlus_disb" : result[13],
            "grdlus_recip" : result[14],
            "sum_grdlus_disb" : result[15],
            "prplus_recip" : result[16],
            "sum_prplus_disb" : result[17],
            "grplus_recip" : result[18],
            "sum_grplus_disb" : result[19],
            "grdlsb_recip" : result[20],
            "sum_grdlsb_disb" : result[21]
        }
        allfedloandata.append(newEntry)

    return jsonify(allfedloandata)

#################################################
# Flask route for all fed loan data by aid year
#################################################

@app.route("/fedloandata/year/<aidyear>")
def year_fedloan(aidyear, allfedloan_data = allfedloan_data):
    sel = [
        allfedloan_data.ope_id,
        allfedloan_data.school,
        allfedloan_data.school_name_org,
        allfedloan_data.ope_school_identifier,
        allfedloan_data.state,
        allfedloan_data.zip_code,
        allfedloan_data.school_type,
        allfedloan_data.year_begin,
        allfedloan_data.year_end,
        allfedloan_data.aid_year,
        allfedloan_data.dlsb_recip,
        allfedloan_data.sum_dlsb_disb,
        allfedloan_data.ugdlus_recip,
        allfedloan_data.sum_ugdlus_disb,
        allfedloan_data.grdlus_recip,
        allfedloan_data.sum_grdlus_disb,
        allfedloan_data.prplus_recip,
        allfedloan_data.sum_prplus_disb,
        allfedloan_data.grplus_recip,
        allfedloan_data.sum_grplus_disb,
        allfedloan_data.grdlsb_recip,
        allfedloan_data.sum_grdlsb_disb,
    ]

    results = db.session.query(*sel).filter(allfedloan_data.aid_year == aidyear).all()

    yearfedloandata = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "ugdlus_recip" : result[12],
            "sum_ugdlus_disb" : result[13],
            "grdlus_recip" : result[14],
            "sum_grdlus_disb" : result[15],
            "prplus_recip" : result[16],
            "sum_prplus_disb" : result[17],
            "grplus_recip" : result[18],
            "sum_grplus_disb" : result[19],
            "grdlsb_recip" : result[20],
            "sum_grdlsb_disb" : result[21]
        }
        yearfedloandata.append(newEntry)

    return jsonify(yearfedloandata)

#################################################
# Flask route for all fed loan data by ope school id
#################################################

@app.route("/fedloandata/school/<ope_school_identifier>")
def ope_fedloan(ope_school_identifier, allfedloan_data = allfedloan_data):
    sel = [
        allfedloan_data.ope_id,
        allfedloan_data.school,
        allfedloan_data.school_name_org,
        allfedloan_data.ope_school_identifier,
        allfedloan_data.state,
        allfedloan_data.zip_code,
        allfedloan_data.school_type,
        allfedloan_data.year_begin,
        allfedloan_data.year_end,
        allfedloan_data.aid_year,
        allfedloan_data.dlsb_recip,
        allfedloan_data.sum_dlsb_disb,
        allfedloan_data.ugdlus_recip,
        allfedloan_data.sum_ugdlus_disb,
        allfedloan_data.grdlus_recip,
        allfedloan_data.sum_grdlus_disb,
        allfedloan_data.prplus_recip,
        allfedloan_data.sum_prplus_disb,
        allfedloan_data.grplus_recip,
        allfedloan_data.sum_grplus_disb,
        allfedloan_data.grdlsb_recip,
        allfedloan_data.sum_grdlsb_disb,
    ]

    results = db.session.query(*sel).filter(allfedloan_data.ope_school_identifier == ope_school_identifier).all()

    opefedloandata = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "ugdlus_recip" : result[12],
            "sum_ugdlus_disb" : result[13],
            "grdlus_recip" : result[14],
            "sum_grdlus_disb" : result[15],
            "prplus_recip" : result[16],
            "sum_prplus_disb" : result[17],
            "grplus_recip" : result[18],
            "sum_grplus_disb" : result[19],
            "grdlsb_recip" : result[20],
            "sum_grdlsb_disb" : result[21]
        }
        opefedloandata.append(newEntry)

    return jsonify(opefedloandata)

#################################################
# Flask Route for all US based fed loan data
#################################################

@app.route("/usfedloandata/all")
def usfedloandata(usfedloan_data = usfedloan_data):
    sel = [
        usfedloan_data.ope_id,
        usfedloan_data.school,
        usfedloan_data.school_name_org,
        usfedloan_data.ope_school_identifier,
        usfedloan_data.state,
        usfedloan_data.zip_code,
        usfedloan_data.school_type,
        usfedloan_data.year_begin,
        usfedloan_data.year_end,
        usfedloan_data.aid_year,
        usfedloan_data.dlsb_recip,
        usfedloan_data.sum_dlsb_disb,
        usfedloan_data.avg_school_dlsb,
        usfedloan_data.ugdlus_recip,
        usfedloan_data.sum_ugdlus_disb,
        usfedloan_data.avg_school_ugdlus,
        usfedloan_data.grdlus_recip,
        usfedloan_data.sum_grdlus_disb,
        usfedloan_data.avg_school_grdlus,
        usfedloan_data.prplus_recip,
        usfedloan_data.sum_prplus_disb,
        usfedloan_data.avg_school_prplus,
        usfedloan_data.grplus_recip,
        usfedloan_data.sum_grplus_disb,
        usfedloan_data.avg_school_grplus,
        usfedloan_data.grdlsb_recip,
        usfedloan_data.sum_grdlsb_disb,
        usfedloan_data.avg_school_grdlsb,
    ]

    results = db.session.query(*sel).all()

    usfedloandatalist = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "avg_school_dlsb" : result[12],
            "ugdlus_recip" : result[13],
            "sum_ugdlus_disb" : result[14],
            "avg_school_ugdlus" : result[15],
            "grdlus_recip" : result[16],
            "sum_grdlus_disb" : result[17],
            "avg_school_grdlus" : result[18],
            "prplus_recip" : result[19],
            "sum_prplus_disb" : result[20],
            "avg_school_prplus" : result[21],
            "grplus_recip" : result[22],
            "sum_grplus_disb" : result[23],
            "avg_school_grplus" : result[24],
            "grdlsb_recip" : result[25],
            "sum_grdlsb_disb" : result[26],
            "avg_school_grdlsb" : result[27]
        }
        usfedloandatalist.append(newEntry)

    return jsonify(usfedloandatalist)

#################################################
# Flask route for all US fed loan data by year
#################################################

@app.route("/usfedloandata/year/<aidyear>")
def year_usfedloan(aidyear, usfedloan_data = usfedloan_data):
    sel = [
        usfedloan_data.ope_id,
        usfedloan_data.school,
        usfedloan_data.school_name_org,
        usfedloan_data.ope_school_identifier,
        usfedloan_data.state,
        usfedloan_data.zip_code,
        usfedloan_data.school_type,
        usfedloan_data.year_begin,
        usfedloan_data.year_end,
        usfedloan_data.aid_year,
        usfedloan_data.dlsb_recip,
        usfedloan_data.sum_dlsb_disb,
        usfedloan_data.avg_school_dlsb,
        usfedloan_data.ugdlus_recip,
        usfedloan_data.sum_ugdlus_disb,
        usfedloan_data.avg_school_ugdlus,
        usfedloan_data.grdlus_recip,
        usfedloan_data.sum_grdlus_disb,
        usfedloan_data.avg_school_grdlus,
        usfedloan_data.prplus_recip,
        usfedloan_data.sum_prplus_disb,
        usfedloan_data.avg_school_prplus,
        usfedloan_data.grplus_recip,
        usfedloan_data.sum_grplus_disb,
        usfedloan_data.avg_school_grplus,
        usfedloan_data.grdlsb_recip,
        usfedloan_data.sum_grdlsb_disb,
        usfedloan_data.avg_school_grdlsb,
    ]

    results = db.session.query(*sel).filter(usfedloan_data.aid_year == aidyear).all()

    yearusfedloandata = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "avg_school_dlsb" : result[12],
            "ugdlus_recip" : result[13],
            "sum_ugdlus_disb" : result[14],
            "avg_school_ugdlus" : result[15],
            "grdlus_recip" : result[16],
            "sum_grdlus_disb" : result[17],
            "avg_school_grdlus" : result[18],
            "prplus_recip" : result[19],
            "sum_prplus_disb" : result[20],
            "avg_school_prplus" : result[21],
            "grplus_recip" : result[22],
            "sum_grplus_disb" : result[23],
            "avg_school_grplus" : result[24],
            "grdlsb_recip" : result[25],
            "sum_grdlsb_disb" : result[26],
            "avg_school_grdlsb" : result[27]
        }
        yearusfedloandata.append(newEntry)

    return jsonify(yearusfedloandata)

#################################################
# Flask route for all US fed loan data by ope school id
#################################################

@app.route("/usfedloandata/school/<ope_school_identifier>")
def ope_usfedloan(ope_school_identifier, usfedloan_data = usfedloan_data):
    sel = [
        usfedloan_data.ope_id,
        usfedloan_data.school,
        usfedloan_data.school_name_org,
        usfedloan_data.ope_school_identifier,
        usfedloan_data.state,
        usfedloan_data.zip_code,
        usfedloan_data.school_type,
        usfedloan_data.year_begin,
        usfedloan_data.year_end,
        usfedloan_data.aid_year,
        usfedloan_data.dlsb_recip,
        usfedloan_data.sum_dlsb_disb,
        usfedloan_data.avg_school_dlsb,
        usfedloan_data.ugdlus_recip,
        usfedloan_data.sum_ugdlus_disb,
        usfedloan_data.avg_school_ugdlus,
        usfedloan_data.grdlus_recip,
        usfedloan_data.sum_grdlus_disb,
        usfedloan_data.avg_school_grdlus,
        usfedloan_data.prplus_recip,
        usfedloan_data.sum_prplus_disb,
        usfedloan_data.avg_school_prplus,
        usfedloan_data.grplus_recip,
        usfedloan_data.sum_grplus_disb,
        usfedloan_data.avg_school_grplus,
        usfedloan_data.grdlsb_recip,
        usfedloan_data.sum_grdlsb_disb,
        usfedloan_data.avg_school_grdlsb,
    ]

    results = db.session.query(*sel).filter(usfedloan_data.ope_school_identifier == ope_school_identifier).all()

    opeusfedloandata = []
    for result in results:
        newEntry = {
            "ope_id" : result[0],
            "school" : result[1],
            "school_name_org" : result[2],
            "ope_school_identifier" : result[3],
            "state" : result[4],
            "zip_code" : result[5],
            "school_type" : result[6],
            "year_begin" : result[7],
            "year_end" : result[8],
            "aid_year" : result[9],
            "dlsb_recip" : result[10],
            "sum_dlsb_disb" : result[11],
            "avg_school_dlsb" : result[12],
            "ugdlus_recip" : result[13],
            "sum_ugdlus_disb" : result[14],
            "avg_school_ugdlus" : result[15],
            "grdlus_recip" : result[16],
            "sum_grdlus_disb" : result[17],
            "avg_school_grdlus" : result[18],
            "prplus_recip" : result[19],
            "sum_prplus_disb" : result[20],
            "avg_school_prplus" : result[21],
            "grplus_recip" : result[22],
            "sum_grplus_disb" : result[23],
            "avg_school_grplus" : result[24],
            "grdlsb_recip" : result[25],
            "sum_grdlsb_disb" : result[26],
            "avg_school_grdlsb" : result[27]
        }
        opeusfedloandata.append(newEntry)

    return jsonify(opeusfedloandata)

#################################################
# Flask route for all school count data
#################################################

@app.route("/annualdata/all/schoolcount")
def annualschooldata(schoolcount_data = schoolcount_data):
    sel = [
        schoolcount_data.aid_year,
        schoolcount_data.school_count,
        schoolcount_data.public,
        schoolcount_data.private,
        schoolcount_data.proprietary,
        schoolcount_data.foreign_public,
        schoolcount_data.foreign_private,
        schoolcount_data.foreign_profit,
        schoolcount_data.public_pct,
        schoolcount_data.private_pct,
        schoolcount_data.proprietary_pct,
        schoolcount_data.forpub_pct,
        schoolcount_data.forprv_pct,
        schoolcount_data.forprop_pct
    ]

    results = db.session.query(*sel).all()

    annualdata = []
    for result in results:
        newEntry = {
            "aid_year" : result[0],
            "school_count" : result[1],
            "public" : result[2],
            "private" : result[3],
            "proprietary" : result[4],
            "foreign_public" : result[5],
            "foreign_private" : result[6],
            "foreign_profit" : result[7],
            "public_pct" : result[8],
            "private_pct" : result[9],
            "proprietary_pct" : result[10],
            "forpub_pct" : result[11],
            "forprv_pct" : result[12],
            "forprop_pct" : result[13]
        }
        annualdata.append(newEntry)

    return jsonify(annualdata)

@app.route("/annualdata/all/recipients_disbursements")
def annualrecipdisbdata(annual_recipdisb_data = annual_recipdisb_data):
    sel = [
        annual_recipdisb_data.aid_year,
        annual_recipdisb_data.total_dlsb_recip,
        annual_recipdisb_data.total_ugdlus_recip,
        annual_recipdisb_data.total_grdlus_recip,
        annual_recipdisb_data.total_prplus_recip,
        annual_recipdisb_data.total_grplus_recip,
        annual_recipdisb_data.total_grdlsb_recip,
        annual_recipdisb_data.total_dlsb_sum,
        annual_recipdisb_data.total_ugdlus_sum,
        annual_recipdisb_data.total_grdlus_sum,
        annual_recipdisb_data.total_prplus_sum,
        annual_recipdisb_data.total_grplus_sum,
        annual_recipdisb_data.total_grdlsb_sum,
        annual_recipdisb_data.avgdebt_dlsb,
        annual_recipdisb_data.avgdebt_ugdlus,
        annual_recipdisb_data.avgdebt_grdlus,
        annual_recipdisb_data.avgdebt_prplus,
        annual_recipdisb_data.avgdebt_grplus,
        annual_recipdisb_data.avgdebt_grdlsb,
    ]

    results = db.session.query(*sel).all()

    annualdata = []
    for result in results:
        newEntry = {
            "aid_year" : result[0],
            "total_dlsb_recip" : result[1],
            "total_ugdlus_recip" : result[2],
            "total_grdlus_recip" : result[3],
            "total_prplus_recip" : result[4],
            "total_grplus_recip" : result[5],
            "total_grdlsb_recip" : result[6],
            "total_dlsb_sum" : result[7],
            "total_ugdlus_sum" : result[8],
            "total_grdlus_sum" : result[9],
            "total_prplus_sum" : result[10],
            "total_grplus_sum" : result[11],
            "total_grdlsb_sum" : result[12],
            "avgdebt_dlsb" : result[13],
            "avgdebt_ugdlus" : result[14],
            "avgdebt_grdlus" : result[15],
            "avgdebt_prplus" : result[16],
            "avgdebt_grplus" : result[17],
            "avgdebt_grdlsb" : result[18],
        }
        annualdata.append(newEntry)

    return jsonify(annualdata)

@app.route("/annualdata/all/recipients_disbursements/<aidyear>")
def yearrecipdisbdata(aidyear, annual_recipdisb_data = annual_recipdisb_data):
    sel = [
        annual_recipdisb_data.aid_year,
        annual_recipdisb_data.total_dlsb_recip,
        annual_recipdisb_data.total_ugdlus_recip,
        annual_recipdisb_data.total_grdlus_recip,
        annual_recipdisb_data.total_prplus_recip,
        annual_recipdisb_data.total_grplus_recip,
        annual_recipdisb_data.total_grdlsb_recip,
        annual_recipdisb_data.total_dlsb_sum,
        annual_recipdisb_data.total_ugdlus_sum,
        annual_recipdisb_data.total_grdlus_sum,
        annual_recipdisb_data.total_prplus_sum,
        annual_recipdisb_data.total_grplus_sum,
        annual_recipdisb_data.total_grdlsb_sum,
        annual_recipdisb_data.avgdebt_dlsb,
        annual_recipdisb_data.avgdebt_ugdlus,
        annual_recipdisb_data.avgdebt_grdlus,
        annual_recipdisb_data.avgdebt_prplus,
        annual_recipdisb_data.avgdebt_grplus,
        annual_recipdisb_data.avgdebt_grdlsb,
    ]

    results = db.session.query(*sel).filter(annual_recipdisb_data.aid_year == aidyear).all()

    annualdata = []
    for result in results:
        newEntry = {
            "aid_year" : result[0],
            "total_dlsb_recip" : result[1],
            "total_ugdlus_recip" : result[2],
            "total_grdlus_recip" : result[3],
            "total_prplus_recip" : result[4],
            "total_grplus_recip" : result[5],
            "total_grdlsb_recip" : result[6],
            "total_dlsb_sum" : result[7],
            "total_ugdlus_sum" : result[8],
            "total_grdlus_sum" : result[9],
            "total_prplus_sum" : result[10],
            "total_grplus_sum" : result[11],
            "total_grdlsb_sum" : result[12],
            "avgdebt_dlsb" : result[13],
            "avgdebt_ugdlus" : result[14],
            "avgdebt_grdlus" : result[15],
            "avgdebt_prplus" : result[16],
            "avgdebt_grplus" : result[17],
            "avgdebt_grdlsb" : result[18],
        }
        annualdata.append(newEntry)

    return jsonify(annualdata)

@app.route("/annualdata/us/recipients_disbursements")
def schooltypedata(usfedloan_schooltype_data = usfedloan_schooltype_data):
    sel = [
        usfedloan_schooltype_data.aid_year,
        usfedloan_schooltype_data.school_type,
        usfedloan_schooltype_data.us_dlsb_recip,
        usfedloan_schooltype_data.us_ugdlus_recip,
        usfedloan_schooltype_data.us_grdlus_recip,
        usfedloan_schooltype_data.us_prplus_recip,
        usfedloan_schooltype_data.us_grplus_recip,
        usfedloan_schooltype_data.us_grdlsb_recip,
        usfedloan_schooltype_data.us_dlsb_sum,
        usfedloan_schooltype_data.us_ugdlus_sum,
        usfedloan_schooltype_data.us_grdlus_sum,
        usfedloan_schooltype_data.us_prplus_sum,
        usfedloan_schooltype_data.us_grplus_sum,
        usfedloan_schooltype_data.us_grdlsb_sum,
        usfedloan_schooltype_data.us_dlsb_avg,
        usfedloan_schooltype_data.us_ugdlus_avg,
        usfedloan_schooltype_data.us_grdlus_avg,
        usfedloan_schooltype_data.us_prplus_avg,
        usfedloan_schooltype_data.us_grplus_avg,
        usfedloan_schooltype_data.us_grdlsb_avg,
    ]

    results = db.session.query(*sel).order_by(asc(usfedloan_schooltype_data.school_type)).all()

    annualdata = []
    for result in results:
        newEntry = {
            "aid_year" : result[0],
            "school_type" : result[1],
            "us_dlsb_recip" : result[2],
            "us_ugdlus_recip" : result[3],
            "us_grdlus_recip" : result[4],
            "us_prplus_recip" : result[5],
            "us_grplus_recip" : result[6],
            "us_grdlsb_recip" : result[7],
            "us_dlsb_sum" : result[8],
            "us_ugdlus_sum" : result[9],
            "us_grdlus_sum" : result[10],
            "us_prplus_sum" : result[11],
            "us_grplus_sum" : result[12],
            "us_grdlsb_sum" : result[13],
            "us_dlsb_avg" : result[14],
            "us_ugdlus_avg" : result[15],
            "us_grdlus_avg" : result[16],
            "us_prplus_avg" : result[17],
            "us_grplus_avg" : result[18],
            "us_grdlsb_avg" : result[19],
        }
        annualdata.append(newEntry)

    return jsonify(annualdata)


# @app.route("/ozone_data/<fips>")
# def get_by_fips_ozone(fips, ozone_data = ozone_data):
#     sel = [
#         ozone_data.fips,
#         ozone_data.arithmetic_mean,
#         ozone_data.state_county,
#         ozone_data.year,
#     ]

#     results = db.session.query(*sel).filter(ozone_data.fips == fips).all()

#     # Create a dictionary entry for each row of metadata information
#     ozone_data = {}
#     for result in results:
#         ozone_data["fips"] = result[0]
#         ozone_data["arithmetic_mean"] = result[1]
#         ozone_data['state_county'] = result[2]
#         ozone_data['year'] = result[3]

#     return jsonify(ozone_data)
    
# @app.route("/allfedloans/<ope_id>")
# def get_data_opeid(ope_id, allfedloan_data = allfedloan_data):
#     sel = [
#         allfedloan_data.ope_id,
#         allfedloan_data.school,
#         allfedloan_data.school_name_org,
#         allfedloan_data.state,
#     ]

#     results = db.session.query(*sel).filter(allfedloan_data.ope_id == ope_id).all()

#     # Create a dictionary entry for each row of metadata information
#     school_data = {}
#     for result in results:
#         allfedloan_data["ope_id"] = result[0]
#         allfedloan_data["school"] = result[1]
#         allfedloan_data['school_name_org'] = result[2]
#         allfedloan_data['state'] = result[3]

#     return jsonify(allfedloan_data)


# @app.route("/ozone_data/all")
# def all_ozone(ozone_data = ozone_data):
#     sel = [
#         ozone_data.fips,
#         ozone_data.arithmetic_mean,
#         ozone_data.state_county,
#         ozone_data.year,
#         ozone_data.state
#     ]

#     results = db.session.query(*sel).all()

#     ozone_data = []
#     for result in results:
#         newEntry = {
#             "fips": result[0],
#             "arithmetic_mean": result[1],
#             "state_county": result[2],
#             "year": result[3],
#             "state": result[4]
#         }
#         ozone_data.append(newEntry)

#     return jsonify(ozone_data)

# @app.route("/ozone_state/<state>/<year>")
# def get_by_state_ozone(state, year, ozone_data = ozone_data):
#     """Return a list of ozone data by state, county, and year."""
#     """Return the MetaData for a given sample."""
    
#     sel = [
#         ozone_data.state,
#         ozone_data.county,
#         ozone_data.year,
#         ozone_data.arithmetic_mean
#     ]

#     results = db.session.query(*sel).filter(ozone_data.state == state.title()).filter(ozone_data.year == year).group_by(ozone_data.fips).all()

#     # Create a dictionary entry for each row of metadata information
#     ozone_data = []
#     for result in results:
#         ozone_data.append({
#             "state": result[0],
#             "county": result[1],
#             "year": result[2],
#             "arithmetic_mean": result[3]
#         })
#     return jsonify(ozone_data)

# @app.route("/aqi_data/fips/<fips>")
# def get_by_fips_aqi(fips, aqi_data = aqi_data):
#     """Return a list of sample names."""
#     """Return the MetaData for a given sample."""
#     sel = [
#         aqi_data.state,
#         aqi_data.county,
#         aqi_data.year,
#         aqi_data.days_with_aqi,
#         aqi_data.good_days,
#         aqi_data.moderate_days,
#         aqi_data.unhealthy_sensitive_days,
#         aqi_data.unhealthy_days,
#         aqi_data.very_unhealthy_days,
#         aqi_data.hazardous_days,
#         aqi_data.max_aqi,
#         aqi_data.median_aqi,
#         aqi_data.state_county,
#         aqi_data.fips,
#         aqi_data.good_percentage,
#         aqi_data.moderate_percentage,
#         aqi_data.unhealthy_sensitive_percentage,
#         aqi_data.unhealthy_percentage,
#         aqi_data.very_unhealthy_percentage,
#         aqi_data.hazardous_percentage,
#         aqi_data.id
#     ]

#     results = db.session.query(*sel).filter(aqi_data.fips == fips).all()

#     # Create a dictionary entry for each row of metadata information
#     aqi_data = {}
#     for result in results:
#         aqi_data["state"] = result[0]
#         aqi_data["county"] = result[1]
#         aqi_data["year"] = result[2]
#         aqi_data["days_with_aqi"] = result[3]
#         aqi_data["good_days"] = result[4]
#         aqi_data["moderate_days"] = result[5]
#         aqi_data["unhealthy_sensitive_days"] = result[6]
#         aqi_data["unhealthy_days"] = result[7]
#         aqi_data["very_unhealthy_days"] = result[8]
#         aqi_data["hazardous_days"] = result[9]
#         aqi_data["max_aqi"] = result[10]
#         aqi_data["median_aqi"] = result[11]
#         aqi_data["state_county"] = result[12]
#         aqi_data["fips"] = result[13]
#         aqi_data["good_percentage"] = result[14]
#         aqi_data["moderate_percentage"] = result[15]
#         aqi_data["unhealthy_sensitive_percentage"] = result[16]
#         aqi_data["unhealthy_percentage"] = result[17]
#         aqi_data["very_unhealthy_percentage"] = result[18]
#         aqi_data["hazardous_percentage"] = result[19]
#         aqi_data["id"] = result[20]


#     return jsonify(aqi_data)


# @app.route("/aqi_data/all")
# def all_aqi(aqi_data = aqi_data):
#     """Return a list of sample names."""
#     """Return the MetaData for a given sample."""
#     sel = [
#         aqi_data.state,
#         aqi_data.county,
#         aqi_data.year,
#         aqi_data.days_with_aqi,
#         aqi_data.good_days,
#         aqi_data.moderate_days,
#         aqi_data.unhealthy_sensitive_days,
#         aqi_data.unhealthy_days,
#         aqi_data.very_unhealthy_days,
#         aqi_data.hazardous_days,
#         aqi_data.max_aqi,
#         aqi_data.median_aqi,
#         aqi_data.state_county,
#         aqi_data.state_abbr,
#         aqi_data.fips,
#         aqi_data.good_percentage,
#         aqi_data.moderate_percentage,
#         aqi_data.unhealthy_sensitive_percentage,
#         aqi_data.unhealthy_percentage,
#         aqi_data.very_unhealthy_percentage,
#         aqi_data.hazardous_percentage,
#         aqi_data.id
#     ]

#     # results = db.session.query(*sel).all()
#     results = db.session.query(*sel).order_by(asc(aqi_data.good_percentage)).all()

#     aqi_data = []
#     for result in results:
#         newEntry = {
#             "state": result[0],
#             "county": result[1],
#             "year": result[2],
#             "days_with_aqi": result[3],
#             "good_days": result[4],
#             "moderate_days": result[5],
#             "unhealthy_sensitive_days": result[6],
#             "unhealthy_days": result[7],
#             "very_unhealthy_days": result[8],
#             "hazardous_days": result[9],
#             "max_aqi": result[10],
#             "median_aqi": result[11],
#             "state_county": result[12],
#             "state_abbr": result[13],
#             "fips": result[14],
#             "good_percentage": result[15],
#             "moderate_percentage": result[16],
#             "unhealthy_sensitive_percentage": result[17],
#             "unhealthy_percentage": result[18],
#             "very_unhealthy_percentage": result[19],
#             "hazardous_percentage": result[20],
#             "id":result[21]
#         }
#         aqi_data.append(newEntry)

#     return jsonify(aqi_data)


# @app.route("/aqi_data/year/<year>")
# def year_aqi(year, aqi_data = aqi_data):
#     """Return a list of sample names."""
#     """Return the MetaData for a given sample."""
#     sel = [
#         aqi_data.state,
#         aqi_data.county,
#         aqi_data.year,
#         aqi_data.days_with_aqi,
#         aqi_data.good_days,
#         aqi_data.moderate_days,
#         aqi_data.unhealthy_sensitive_days,
#         aqi_data.unhealthy_days,
#         aqi_data.very_unhealthy_days,
#         aqi_data.hazardous_days,
#         aqi_data.max_aqi,
#         aqi_data.median_aqi,
#         aqi_data.state_county,
#         aqi_data.state_abbr,
#         aqi_data.fips,
#         aqi_data.good_percentage,
#         aqi_data.moderate_percentage,
#         aqi_data.unhealthy_sensitive_percentage,
#         aqi_data.unhealthy_percentage,
#         aqi_data.very_unhealthy_percentage,
#         aqi_data.hazardous_percentage,
#         aqi_data.id
#     ]

#     # results = db.session.query(*sel).all()
#     results = db.session.query(*sel).filter(aqi_data.year == year).order_by(asc(aqi_data.good_percentage)).all()


#     aqi_data = []
#     for result in results:
#         newEntry = {
#             "state": result[0],
#             "county": result[1],
#             "year": result[2],
#             "days_with_aqi": result[3],
#             "good_days": result[4],
#             "moderate_days": result[5],
#             "unhealthy_sensitive_days": result[6],
#             "unhealthy_days": result[7],
#             "very_unhealthy_days": result[8],
#             "hazardous_days": result[9],
#             "max_aqi": result[10],
#             "median_aqi": result[11],
#             "state_county": result[12],
#             "state_abbr": result[13],
#             "fips": result[14],
#             "good_percentage": result[15],
#             "moderate_percentage": result[16],
#             "unhealthy_sensitive_percentage": result[17],
#             "unhealthy_percentage": result[18],
#             "very_unhealthy_percentage": result[19],
#             "hazardous_percentage": result[20],
#             "id":result[21]
#         }
#         aqi_data.append(newEntry)

#     return jsonify(aqi_data)

# @app.route("/aqi_data/state/<state_abbr>")
# def all_aqi_bystate(state_abbr, aqi_data = aqi_data):
#     """Return a list of sample names."""
#     """Return the MetaData for a given sample."""
#     sel = [
#         aqi_data.state,
#         aqi_data.county,
#         aqi_data.year,
#         aqi_data.days_with_aqi,
#         aqi_data.good_days,
#         aqi_data.moderate_days,
#         aqi_data.unhealthy_sensitive_days,
#         aqi_data.unhealthy_days,
#         aqi_data.very_unhealthy_days,
#         aqi_data.hazardous_days,
#         aqi_data.max_aqi,
#         aqi_data.median_aqi,
#         aqi_data.state_county,
#         aqi_data.state_abbr,
#         aqi_data.fips,
#         aqi_data.good_percentage,
#         aqi_data.moderate_percentage,
#         aqi_data.unhealthy_sensitive_percentage,
#         aqi_data.unhealthy_percentage,
#         aqi_data.very_unhealthy_percentage,
#         aqi_data.hazardous_percentage,
#         aqi_data.id
#     ]

#     # results = db.session.query(*sel).all()
#     results = db.session.query(*sel).filter(aqi_data.state_abbr == state_abbr).all()

#     aqi_data = []
#     for result in results:
#         newEntry = {
#             "state": result[0],
#             "county": result[1],
#             "year": result[2],
#             "days_with_aqi": result[3],
#             "good_days": result[4],
#             "moderate_days": result[5],
#             "unhealthy_sensitive_days": result[6],
#             "unhealthy_days": result[7],
#             "very_unhealthy_days": result[8],
#             "hazardous_days": result[9],
#             "max_aqi": result[10],
#             "median_aqi": result[11],
#             "state_county": result[12],
#             "state_abbr": result[13],
#             "fips": result[14],
#             "good_percentage": result[15],
#             "moderate_percentage": result[16],
#             "unhealthy_sensitive_percentage": result[17],
#             "unhealthy_percentage": result[18],
#             "very_unhealthy_percentage": result[19],
#             "hazardous_percentage": result[20],
#             "id":result[21]
#         }
#         aqi_data.append(newEntry)

#     return jsonify(aqi_data)


if __name__ == "__main__":
    app.run(debug=True)