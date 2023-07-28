(in-package :mu-cl-resources)

(define-resource recipe ()
  :class (s-prefix "schema:Recipe")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:category :string , (s-prefix "schema:recipeCategory")))
  :has-many `((restaurant :via , (s-prefix "schema:hasMenuItem")
                        :as "restaurant")) ;TODO: change to 'restaurants'
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app/recipes/")
  :on-path "recipes")

(define-resource restaurant ()
  :class (s-prefix "schema:Restaurant")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:item :string ,(s-prefix "schema:hasMenuItem")))
  :has-many `((recipe :via , (s-prefix "schema:hasMenuItem")
                        :inverse t
                        :as "recipe")) ;TODO: change to 'recipes' 
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app/restaurants/")
  :on-path "restaurants")