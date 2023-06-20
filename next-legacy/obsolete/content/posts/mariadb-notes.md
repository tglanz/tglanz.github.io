---
layout: post
title: MariaDB Notes
date: 2020-06-26
categories:
  - Databases
  - Notes
tags:
  - MariaDB
---

Everything is well documented in the MySQL/MariaDB documentations, but i'll gather some stuff here which I frequently encounter.

## variables inspection

run ```mysqladmin variables```

## notable variables/configurations

__data_dir__ - the data directory

> usually ```/var/lib/mysql```

__lower_case_table_names__ - as the name suggests, make all tables lower case.

__local_infile__ - enable loading tables from local files.

> for commands such as: ```mysqlimport --local --fields-terminated-by="|" -h localhost some-file.csv```

## configuration files

at least on the machine i am currently at, the root configuration is at ```/etc/my.cnf```. in turn it includes ```/etc/my.cnf.d```.

in there, ill edit configurations in ```/etc/my.cnf.d/server.cnf```.

for example; to have all tables names with lower case and enable local in files, ill add the following under ```[mysqld]```
- lower_case_table_names=1
- local_infile=1

## datadir notes

we can check where it is configured to be at using the variables inspection above, but usually it is at ```/var/lib/mysql```.

it should be owned by the user/group running the process; those are usually mysql/mysql, but we can check this as well. assuming we start the process using ```systemd```, open the service file, and check what are the ```User``` and ```Group``` configured to be. the service file on my machine is at ```/usr/lib/systemd/system/mariadb.service```

## complete reboot

stop mariadb service - ```systemctl stop mariadb```

delete contents of datadir -```rm -rf /var/lib/mysql/*```

remake infrastructure files - ```mysql_install_db --user=mysql --ldata=/var/lib/mysql```

start mariadb service - ```systemctl start mariadb```

> when we need such a thing?
> for example; there are configurations that only apply on installation, such as ```lower_case_table_names```
