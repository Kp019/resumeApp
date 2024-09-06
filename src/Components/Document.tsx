import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface PersonalDetails {
  [key: string]: string;
}

interface Education {
  fieldOfStudy: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
}

interface WorkExperience {
  description: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  name: string;
}

interface Project {
  // technologiesUsed: string;
  title: string;
  link: string;
  description: string;
}

interface Data {
  personalDetails: PersonalDetails;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
}


const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
    fontSize: 12,
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const MyDocument = ({ data }:{data: Data}) => {
  console.log(data);

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{data.personalDetails.fullName || 'Full Name'}</Text>

        <View style={styles.section}>
          <Text style={styles.text}>Email: {data.personalDetails.email || 'example@example.com'}</Text>
          <Text style={styles.text}>Phone: {data.personalDetails.phone || '123-456-7890'}</Text>
          <Text style={styles.text}>GitHub: {data.personalDetails.github || 'github.com/username'}</Text>
          <Text style={styles.text}>LinkedIn: {data.personalDetails.linkedin || 'linkedin.com/in/username'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education:</Text>
          {data.education && data.education.length > 0 ? (
            data.education.map((education, index) => (
              <View key={index}>
                <Text style={styles.text}>{education.degree} in {education.fieldOfStudy}</Text>
                <Text style={styles.text}>{education.school}</Text>
                <Text style={styles.text}>{education.startDate} - {education.endDate}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No education listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Work Experience:</Text>
          {data.workExperience && data.workExperience.length > 0 ? (
            data.workExperience.map((experience, index) => (
              <View key={index}>
                <Text style={styles.text}>{experience.position}</Text>
                <Text style={styles.text}>{experience.company}</Text>
                <Text style={styles.text}>{experience.startDate} - {experience.endDate}</Text>
                <Text style={styles.text}>{experience.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No work experience listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills:</Text>
          {data.skills && data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <Text key={index} style={styles.text}>• {skill}</Text>
            ))
          ) : (
            <Text style={styles.text}>No skills listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Projects:</Text>
          {data.projects && data.projects.length > 0 ? (
            data.projects.map((project, index) => (
              <View key={index}>
                <Text style={styles.text}>{project.title}</Text>
                <Text style={styles.text}>{project.description}</Text>
                <Text style={styles.text}>{project.link}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No projects listed.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;