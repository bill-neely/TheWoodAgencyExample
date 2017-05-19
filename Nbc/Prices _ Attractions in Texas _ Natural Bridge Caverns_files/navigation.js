// JavaScript Document

function resetNavi() {
	$("#mainNav").attr("src","img/popup/_base.gif");
	$("#sub1").hide();
	$("#sub2").hide();
	$("#sub3").hide();
	$("#sub4").hide();
}

function over_things() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_things.gif");
	$("#sub1").show();
}

function over_hours() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_hours.gif");
}

function over_pricing() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_prices.gif");
}

function over_groups() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_group.gif");
	$("#sub2").show();
}

function over_news() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_news.gif");
	$("#sub3").show();
}

function over_history() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_history.gif");
	$("#sub4").show();
}

function over_findus() {
	resetNavi();	
	$("#mainNav").attr("src","img/popup/_findus.gif");
}
	