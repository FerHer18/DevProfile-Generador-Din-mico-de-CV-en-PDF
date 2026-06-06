import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({

  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },

  sidebar: {
    width: "30%",
    backgroundColor: "#214733",
    color: "white",
    padding: 20
  },

  content: {
    width: "70%",
    padding: 25
  },

  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5
  },

  profession: {
    fontSize: 12,
    marginBottom: 20
  },

  sidebarTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8
  },

  sidebarText: {
    fontSize: 10,
    marginBottom: 4
  },

  section: {
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 16,
    color: "#214733",
    marginBottom: 8,
    borderBottom: 1,
    paddingBottom: 4
  },

  text: {
    fontSize: 11,
    lineHeight: 1.5
  },

  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3
  }

});

function PDFDocument({ cv }) {

  return (

    <Document>

        <Page
            size="A4"
            style={styles.page}
        >

            <View style={styles.sidebar}>

            {cv.foto && (

                <Image
                src={cv.foto}
                style={styles.photo}
                />

            )}

            <Text style={styles.name}>
                {cv.nombre}
            </Text>

            <Text style={styles.profession}>
                {cv.profesion}
            </Text>

            <Text style={styles.sidebarTitle}>
                CONTACTO
            </Text>

            <Text style={styles.sidebarText}>
                {cv.correo}
            </Text>

            <Text style={styles.sidebarText}>
                {cv.telefono}
            </Text>

            <Text style={styles.sidebarText}>
                {cv.ciudad}
            </Text>

            <Text style={styles.sidebarTitle}>
                ENLACES
                </Text>

                {cv.enlaces?.map((link,index)=>(
                <Text
                    key={index}
                    style={styles.sidebarText}
                >
                    {link}
                </Text>
                ))}

            <Text style={styles.sidebarTitle}>
                HABILIDADES
            </Text>

            {cv.habilidades?.map((hab,index)=>(

                <Text
                key={index}
                style={styles.sidebarText}
                >
                • {hab}
                </Text>

            ))}

            <Text style={styles.sidebarTitle}>
                IDIOMAS
            </Text>

            {cv.idiomas?.map((idioma,index)=>(

                <Text
                key={index}
                style={styles.sidebarText}
                >
                {idioma.idioma}
                {" - "}
                {idioma.nivel}
                </Text>

            ))}

            </View>

            <View style={styles.content}>

            <View
                style={{
                    width: 80,
                    height: 4,
                    backgroundColor: "#6ea884",
                    marginBottom: 15
                }}
            />

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                PERFIL PROFESIONAL
                </Text>

                <Text style={styles.text}>
                {cv.descripcion}
                </Text>

            </View>

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                PROYECTOS
                </Text>

                {cv.proyectos?.map((proyecto,index)=>(

                <View key={index}>

                    <Text style={styles.projectTitle}>
                    {proyecto.nombre}
                    </Text>

                    <Text style={styles.text}>
                    {proyecto.descripcion}
                    </Text>

                </View>

                ))}

            </View>

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                EDUCACIÓN
                </Text>

                {cv.educacion?.map((edu,index)=>(

                <View key={index}>

                    <Text style={styles.projectTitle}>
                    {edu.institucion}
                    </Text>

                    <Text style={styles.text}>
                    {edu.ingreso}
                    {" - "}
                    {edu.egreso}
                    </Text>

                </View>

                ))}

            </View>

            </View>

        </Page>

    </Document>

  );
}

export default PDFDocument;