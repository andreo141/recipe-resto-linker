(in-package :mu-cl-resources)

(define-resource recipe ()
  :class (s-prefix "schema:Recipe")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:category :string , (s-prefix "schema:recipeCategory")))
  :has-many `((creator :via , (s-prefix "schema:creator")
                        :as "creators"))
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app/recipes/")
  :on-path "recipes")

  (define-resource creator ()
  :class (s-prefix "schema:Person")
  :properties `((:creator :string ,(s-prefix "schema:creator"))
                (:countryOfOrigin :string , (s-prefix "schema:countryOfOrigin")))
  :has-many `((recipe :via , (s-prefix "schema:creator")
                        :inverse t
                        :as "recipes"))
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app/creators/")
  :on-path "creators")




