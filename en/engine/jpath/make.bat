javac PathApplet.java -d tmp
jar cf jpath.jar -C tmp/ path
jarsigner -keystore keys -storepass secret123 jpath.jar me
