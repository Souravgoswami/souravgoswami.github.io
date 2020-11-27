#!/usr/bin/ruby -w

def minify!(lines)
	output = []
	state1 = state2 = false

	lines.each do |x|
		x.strip!
		reject_conditions = x[/^<\s*!\s*--.*--\s*>$/]

		unless reject_conditions
			if state1
				output.push(output.pop << x)
			elsif state2
				output.push(output.pop << ?\s << x)
			else
				output.push(x)
			end

			state1 = x[/^.*<\s*\/?.*>$/]
			state2 = x[/^<.*$/] && !x[/>/]
		end
	end

	output
end

Jekyll::Hooks.register :site, :post_write do |site|
	site.each_site_file do |x|
		file_name = x.destination(site.dest)

		if %w(html svg).include? file_name.split(?..freeze)[-1]
			lines = IO.readlines(file_name)

			lines.each(&:strip!)
			lines.reject!(&:empty?)

			output = minify!(lines)
			2.times { output.replace(minify!(output)) }

			IO.write(file_name, output.join(?\n))
		end
	end
end
