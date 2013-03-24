#!/usr/bin/perl -w

use strict;
use lib "../../perl-libs/";
use CGI qw/:standard/;
use CGI::Carp qw(fatalsToBrowser);
use JSON;

#DATABASE
use DBI;
my $dbh = DBI->connect('dbi:mysql:database=notesapp:host=localhost;port=3306', 'test', 'test',
		       {RaiseError => 1,AutoCommit=>0}) or die "No puedo conectar a la Base de Datos";
$dbh->do("SET CHARACTER SET 'utf8'");
$dbh->commit();
#CGI params
my $params = CGI->new();
#SCREEN
print header("application/x-json") . screen();
$dbh->disconnect();

sub screen {
    my ($result, $keyword);
    if(!defined $params->param('POSTDATA')){
	my $current_page = param("page") || 1;
	my $offset_page = param("start") || 0;
	my $limit_per_page = param("limit") ||  25;

	$keyword = param("keyword") || "";
	my $data = $dbh->selectall_arrayref("SELECT n.id, content, categoryid, name FROM notes n LEFT JOIN categories c ON ".
					    "n.categoryid=c.id WHERE content LIKE ? LIMIT ? OFFSET ?",{Slice=>{}},'%'.$keyword.'%', $limit_per_page, $offset_page);
	my $total = $dbh->selectrow_array("SELECT COUNT(*) FROM notes WHERE content LIKE ?",{},'%'.$keyword.'%') || 0;
	$result = '{notes:[';
	my $count = 0;
	foreach my $d(@$data){
	    $result .= '{"id":'.$d->{id}.', "content":"'.$d->{content}.'", "categoryid":'.$d->{categoryid}.', "category":"'.$d->{name}.'"}';
	    $count++;
	    $result .= ',' if($count != scalar(@$data));
	}
	$result .= '], "total": '.$total.'}';
    }else{
	my $data = $params->param('POSTDATA');
	my $aux = decode_json($data);
	if($ENV{QUERY_STRING} =~ /create/){
	    $dbh->do("INSERT INTO notes VALUES(NULL, ?, ?)",{},$aux->{content}, $aux->{categoryid});
	    $result = '{"success":true, "message":"Note added"}';
	}elsif($ENV{QUERY_STRING} =~ /update/){
	    $dbh->do("UPDATE notes SET content=?, categoryid=? WHERE id=?",{},$aux->{content}, $aux->{categoryid}, $aux->{id});
	    $result = '{"success":true, "message":"Updated"}';
	}elsif($ENV{QUERY_STRING} =~ /destroy/){
	    #IN PROGRESS
	}
    }

    if(param("callback")){
	#IN PROGRESS
    }else{
	return $result;
    }
}
