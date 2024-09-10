grep -q "127.0.0.1 host.docker.internal" /etc/hosts || echo "\n127.0.0.1 host.docker.internal" | sudo tee -a /etc/hosts

grep -q "127.0.0.1 blankclub.work" /etc/hosts || echo "\n127.0.0.1 blankclub.work" | sudo tee -a /etc/hosts
grep -q "127.0.0.1 app.blankclub.work" /etc/hosts || echo "\n127.0.0.1 app.blankclub.work" | sudo tee -a /etc/hosts