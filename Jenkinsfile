pipeline {
    agent any
    
    environment {
        NODE_OPTIONS = "--max-old-space-size=1536"
    }

    stages {
        stage('Clone Git Repository') { 
            steps {
                git branch: 'master', credentialsId: 'Jaezic', url:'https://github.com/AR-tist/ARtist_FrontEnd.git'
                echo 'Clone Git Repository'
                sh 'sudo chmod 777 -R /var/lib/jenkins/workspace/ARtist-Frontend/build'
            }
        }

        stage('Build') { 
            steps {
                echo 'Build'
                sh 'sudo npm install -g'
                sh 'npm run build'
                sh 'sudo chmod 777 -R /var/lib/jenkins/workspace/ARtist-Frontend/build'
            }
        }
        
    }
} 