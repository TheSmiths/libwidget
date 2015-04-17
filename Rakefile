task :doc do
    system("jsduck --config jsduck.json libWidget.js")
    system("mv documentation/* .")
end

task :clean do
    system("rm -r app* data-* *.html extjs favicon.ico *-icons output resources styles*")
end
