require_relative 'lib/jekyll/strip-html/version'

Gem::Specification.new do |spec|
  spec.name          = "jekyll-strip-html"
  spec.version       = Jekyll::Strip::Html::VERSION
  spec.authors       = ["Sourav Goswami"]
  spec.email         = ["souravgoswami@protonmail.com"]
  spec.summary       = %q{Strip HTML files}
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.6.0")
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
