(in-package :mu-cl-resources)

(define-resource recipe ()
  :class (s-prefix "schema:Recipe")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:category :string , (s-prefix "schema:recipeCategory")))
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app")
  :on-path "recipes")

  (define-resource creator ()
  :class (s-prefix "schema:Person")
  :properties `((:creator :string ,(s-prefix "schema:creator"))
                (:countryOfOrigin :string , (s-prefix "schema:countryOfOrigin")))
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app")
  :on-path "creators")

;; (:dasherized-property-name :type, (s-prefix "my-prefix:my-predicate"))
