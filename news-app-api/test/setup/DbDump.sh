#!/bin/bash
# Create Database Dump
mysqldump -h $1 -u $2 -p$3 --no-create-info --skip-lock-tables --skip-triggers $4 > $5