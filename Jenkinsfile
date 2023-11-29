pipeline {
    agent any
    

    stages {
        stage('Clone Git Repository') { 
            steps {
                git branch: 'master', credentialsId: 'Jaezic', url:'https://github.com/AR-tist/ARtist_FrontEnd.git'
                echo 'Clone Git Repository'
                sh 'sudo chmod 777 -R /var/lib/jenkins/workspace'
            }
        }
        stage('Build') { 
            steps {
                echo 'Build'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
} 