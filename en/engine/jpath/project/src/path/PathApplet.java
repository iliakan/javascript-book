package path;

import java.applet.Applet;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.net.URL;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.security.PrivilegedActionException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/**
 * The applet to return directory files list and path to parent
 * Public API only works for files UNDER applet file directory
 * Works only when signed.
 * <p/>
 * To sign:
 * 1. keytool -genkey -keystore myKeyStore -alias me
 * 2. keytool -selfcert -keystore myKeyStore -alias me
 * 3. jarsigner -keystore myKeyStore jpath.jar me
 */

public class PathApplet extends Applet {

    private static final long serialVersionUID = -3228185193549384816L;


    class DirectoryLister implements PrivilegedAction<String[]> {
        private final String folder;

        public DirectoryLister(String folder) {
            this.folder = folder;
        }

        /**
         * Gives list of files in the given folder
         *
         * @return file list
         *         null if no such file
         *         null if not a directory
         */
        public String[] run() {
            File file = new File(folder);

            if (!file.exists()) return null;

            File[] files = file.listFiles();

            List<String> finfo = new ArrayList<String>(255);

            if (files == null) return null;

            for (File f : files) {
                if (f.isHidden()) continue;
                if (f.getName().startsWith(".")) continue;
                finfo.add((f.isDirectory() ? "*" : "") + f.getPath());
            }

            String[] result = new String[finfo.size()];
            for (int i = 0; i < finfo.size(); i++) result[i] = finfo.get(i);

            return result;
        }
    }

    class FileSaver implements PrivilegedAction<Void> {
        private final File targetFile;
        private final String data;

        FileSaver(File targetFile, String data) {
            this.targetFile = targetFile;
            this.data = data;
        }

        /**
         * Gives list of files in the given folder
         *
         * @return file list or null if no such file
         */
        public Void run() {

            try {
                targetFile.delete();
                PrintWriter out = new PrintWriter(targetFile);
                out.print(data);
                out.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            return null;
        }
    }

    protected void ensureRunLocally() {
        if (getCodeBase().getProtocol().equals("file")) return;
        throw new RuntimeException("The applet must be run locally (security measure)");
    }
    /**
     * Saves JSON file in given folder
     * ENSURES: file has .applet.json extension
     */
    public void saveJsonFile(String filePath, String filename, String data) throws PrivilegedActionException {
        ensureRunLocally();

        filename += ".applet.json";

        File targetFile = new File(filePath + "/" + filename);

        AccessController.doPrivileged(new FileSaver(targetFile, data));
    }

    /**
     * Returns list of files under the given folder
     * Folders have '*' at start.
     */
    public String[] getDirectoryPaths(String folder) throws PrivilegedActionException {
        ensureRunLocally();

        return AccessController.doPrivileged(new DirectoryLister(folder));
    }


 @Override
 public void init() {
     super.init();

     try {
         System.err.println(Arrays.asList(getDirectoryPaths("/jsbook")));
     } catch (PrivilegedActionException e) {
         e.printStackTrace();
     }
 }
}
