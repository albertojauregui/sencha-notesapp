#!/usr/bin/perl -w

use strict;
use lib "../../perl-libs/";
use CGI qw/:standard/;
use CGI::Carp qw(fatalsToBrowser);

#DATABASE
use DBI;
my $dbh = DBI->connect('dbi:mysql:database=notesapp:host=localhost;port=3306', 'test', 'test',
		       {RaiseError => 1,AutoCommit=>0}) or die "No puedo conectar a la Base de Datos";
$dbh->do("SET CHARACTER SET 'utf8'");
$dbh->commit();
#CGI params
my $params = CGI->new();
#SCREEN
screen();
$dbh->disconnect();

sub screen {
    my $result;
    my $data = $dbh->selectall_arrayref("SELECT id, name FROM categories",{Slice=>{}});
    $result = '{categories:[';
    my $count = 0;
    foreach my $d(@$data){
	$result .= '{"id":'.$d->{id}.', "name":"'.$d->{name}.'"}';
	$count++;
	$result .= ',' if($count != scalar(@$data));
    }
    $result .= ']}';

    if(param("callback")){
	#IN PROGRESS
    }else{
	print header("application/json");
	print $result;
    }
}
