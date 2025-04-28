# Use an official PHP image with Apache
FROM php:8.2-apache

# Install PDO MySQL extension and other useful extensions
RUN docker-php-ext-install pdo pdo_mysql && \
    apt-get update && \
    apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd

# Enable Apache mod_rewrite (important for routing if needed)
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy all files to the working directory, but exclude unnecessary files (e.g., .git, node_modules)
COPY . /var/www/html

# Configure Apache to allow .htaccess usage
RUN echo '<Directory /var/www/html>' > /etc/apache2/conf-available/htaccess.conf && \
    echo '    AllowOverride All' >> /etc/apache2/conf-available/htaccess.conf && \
    echo '</Directory>' >> /etc/apache2/conf-available/htaccess.conf && \
    a2enconf htaccess

# Expose port 80 inside the container
EXPOSE 80
