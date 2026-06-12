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
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#222"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  headerInfo: {
    flex: 1,
    paddingRight: 15
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4
  },
  profession: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6
  },
  contact: {
    fontSize: 10,
    color: "#444"
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    marginVertical: 12
  },
  section: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8
  },
  text: {
    lineHeight: 1.5
  },
  educationRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  year: {
    width: 120,
    fontWeight: "bold"
  },
  educationInfo: {
    flex: 1
  },
  bold: {
    fontWeight: "bold"
  },
  project: {
    marginBottom: 10
  },
  projectTitle: {
    fontWeight: "bold",
    marginBottom: 4
  },
  bullet: {
    marginLeft: 10,
    lineHeight: 1.5
  },
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  column: {
    width: "48%"
  },
  item: {
    marginBottom: 4
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  skillNivel: {
    color: "#2d6a4f",
    fontSize: 10
  }
});

function PDFDocument({ cv }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{cv.nombre?.toUpperCase()}</Text>
            <Text style={styles.profession}>{cv.profesion?.toUpperCase()}</Text>
            <Text style={styles.contact}>
              {cv.ciudad}{" | "}{cv.correo}{" | "}{cv.telefono}
            </Text>
            {cv.enlaces?.length > 0 && (
              <Text style={styles.contact}>{cv.enlaces.join(" | ")}</Text>
            )}
          </View>
          {cv.foto && <Image src={cv.foto} style={styles.photo} />}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERFIL PROFESIONAL</Text>
          <Text style={styles.text}>{cv.descripcion}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCACIÓN</Text>
          {cv.educacion?.map((edu, index) => (
            <View key={index} style={styles.educationRow}>
              <Text style={styles.year}>{edu.ingreso} - {edu.egreso}</Text>
              <View style={styles.educationInfo}>
                <Text style={styles.bold}>{cv.profesion}</Text>
                <Text>{edu.institucion}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROYECTOS</Text>
          {cv.proyectos?.map((proyecto, index) => (
            <View key={index} style={styles.project}>
              <Text style={styles.projectTitle}>{proyecto.nombre}</Text>
              <Text style={styles.bullet}>• {proyecto.descripcion}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>HABILIDADES</Text>
            {cv.habilidades?.map((hab, index) => (
              <View key={index} style={styles.skillRow}>
                <Text style={styles.item}>• {hab.nombre}</Text>
                <Text style={styles.skillNivel}>{hab.nivel}</Text>
              </View>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>IDIOMAS</Text>
            {cv.idiomas?.map((idioma, index) => (
              <View key={index}>
                <Text style={styles.item}>{idioma.idioma}</Text>
                <Text style={styles.item}>{idioma.nivel}</Text>
                {idioma.descripcion && (
                  <Text style={styles.item}>{idioma.descripcion}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

      </Page>
    </Document>
  );
}

export default PDFDocument;