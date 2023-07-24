(in-package :mu-cl-resources)

(define-resource recipe ()
  :class (s-prefix "schema:Recipe")
  :properties `((:name :string ,(s-prefix "schema:name"))
                (:category :string , (s-prefix "schema:category"))
                (:area :string, (s-prefix "schema:area"))
                (:instructions :string, (s-prefix "schema:instructions"))
                (:thumbnail :string, (s-prefix "schema:thumbnail"))
                (:tags :string, (s-prefix "schema:tags")))
  :resource-base (s-url "http://mu.semte.ch/application/recipe-app")
  :on-path "recipes")

(:dasherized-property-name :type, (s-prefix "my-prefix:my-predicate"))
