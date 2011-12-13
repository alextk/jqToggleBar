require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'jqToggleBar',
  :description => 'jQuery plugin for creating styled radio and toggle bars',
  :file_name => 'jquery.togglebar.js',
  :js_files => %w{base.js togglebar.js},
  :sass => true
)
JsProjectBuilder::Tasks.new(project)
