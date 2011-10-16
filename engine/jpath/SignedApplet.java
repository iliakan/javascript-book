
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

public class SignedApplet extends Applet {

    private static final long serialVersionUID = -3228185193549384816L;

}
