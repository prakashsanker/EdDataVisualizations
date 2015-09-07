package main

import (
	"net/http"
	"github.com/gorilla/mux"
)

type Route struct {
	Name string
	Method string
	Pattern string
	HandlerFunc http.HandlerFunc
}

type Routes[]Route


func NewRouter() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
	router.PathPrefix("/").Handler(http.FileServer(http.Dir(".././static/")))
	router.Handle("../static/scripts", http.StripPrefix("../static/scripts", http.FileServer(http.Dir("."))))
	return router
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
}